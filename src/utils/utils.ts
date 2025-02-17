import XLSX from 'xlsx';
//引入xlsx
/**
 * 导入excel的函数
 * @param {*} file
 */
export const importsExcel = (files: File) => {
  //使用promise导入
  return new Promise((resolve, reject) => {
    // 获取上传的文件对象
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      //异步操作  excel文件加载完成以后触发
      try {
        const { result } = event.target || {};
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data: any[] = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        resolve(data); //导出数据
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        reject('失败'); //导出失败
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files);
  });
};

type headerConfig = {
  title: string;
  dataIndex: string;
  key: string;
};

/**
 * 导出excel
 * @param {*} headers
 * @param {*} data
 * @param {*} fileName
 */
export const exportExcel = (headers: headerConfig[], data: any[], fileName = 'demo.xlsx') => {
  const _headers = headers
    .map((item, i) =>
      Object.assign(
        {},
        { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 },
      ),
    )
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }),
      {},
    );
  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign(
          {},
          { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) },
        ),
      ),
    )
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign({}, output, {
        '!ref': ref,
        '!cols': [
          { wpx: 45 },
          { wpx: 100 },
          { wpx: 200 },
          { wpx: 80 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 300 },
          { wpx: 300 },
        ],
      }),
    },
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
};

type OutputFormat = {
  x: string | number;
  y?: string | number;
  y1?: string | number;
  name: string;
};

type formatDataForChartFunction = (
  initData: any[],
  ouputFormat: OutputFormat[],
  dataLength?: number,
) => OutputFormat[];

export const formatDataForChart: formatDataForChartFunction = (
  initData: any[] = [],
  ouputFormat: OutputFormat[],
  dataLength?: number,
) => {
  const initArr: OutputFormat[] = [];
  initData?.forEach((item) => {
    const oneGroupData: OutputFormat[] = [];
    ouputFormat.forEach((oneFormat) => {
      oneGroupData.push({
        x: String(item[oneFormat.x]),
        [oneFormat.y ? 'y' : 'y1']: item[(oneFormat.y || oneFormat.y1) as string],
        name: oneFormat.name,
      });
    });
    initArr.push(...oneGroupData);
  });
  if (dataLength) {
    if (initData.length) {
      for (let i = 1; i < dataLength - (initData.length - 1); i += 1) {
        console.log(dataLength, initData?.length);
        const oneGroupData: OutputFormat[] = [];
        ouputFormat.forEach((oneFormat) => {
          oneGroupData.push({
            x: String(initData?.[initData?.length - 1][oneFormat.x] + i),
            y: 0,
            name: oneFormat.name,
          });
        });
        initArr.push(...oneGroupData);
      }
    } else {
      for (let i = 0; i < dataLength; i += 1) {
        const oneGroupData: OutputFormat[] = [];
        ouputFormat.forEach((oneFormat) => {
          oneGroupData.push({
            x: String(i + 1),
            y: 0,
            name: oneFormat.name,
          });
        });
        initArr.push(...oneGroupData);
      }
    }
  }
  return initArr;
};

export const createTimeColumn = (title: string, key: string, timeType?: string) => {
  return [
    {
      title,
      dataIndex: key,
      valueType: 'dateTime',
      width: 180,
      hideInSearch: true,
    },
    {
      title,
      dataIndex: key,
      valueType: timeType || 'dateRange',
      hideInTable: true,
    },
  ];
};

export const randomString = (length: number) => {
  const len = length || 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

export const deepObjectMerge = (FirstOBJ: Record<string, any>, SecondOBJ: Record<string, any>) => {
  // 深度合并对象
  for (const key in SecondOBJ) {
    FirstOBJ[key] =
      FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
        ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
        : (FirstOBJ[key] = SecondOBJ[key]);
  }
  return FirstOBJ;
};

export const onlyUnique = (value: any, index: number, self: any[]) => {
  return self.indexOf(value) === index;
};

export const getParam = (paramName: string) => {
  const query = decodeURI(window.location.search.substring(1));
  const vals = query.split('&');
  let param = '';
  vals.forEach((val) => {
    const pair = val.split('=');
    if (pair[0] === paramName) {
      param = pair[1];
    }
  });
  return param;
};
