import { DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Input, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import type { IconType } from 'rc-tree/lib/interface';
import { useEffect, useRef, useState } from 'react';
import type RcTree from 'rc-tree';
import type { Key } from 'antd/lib/table/interface';
import { cloneDeep } from 'lodash';

const originData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'sss',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const getItemByIdInTree: (key: Key, tree: DataNode[]) => Partial<DataNode> = (
  key: Key,
  tree: DataNode[],
) => {
  let res: Partial<DataNode> = {};
  for (let i = 0; i < tree.length; i++) {
    const ele = tree[i];
    if (ele.key === key) {
      res = ele;
    }
    if (Object.keys(res).length) break;
    if (ele.children?.length) {
      res = getItemByIdInTree(key, ele.children);
    }
  }
  return res;
};

const EditTree = () => {
  const treeRef = useRef<RcTree>(null);
  const [treeData, setTreeData] = useState<DataNode[]>(originData);

  const openTreeNode = (key: Key) => {
    const { expandedKeys = [] } = treeRef.current?.state || {};
    if (!expandedKeys.includes(key)) {
      treeRef.current?.setExpandedKeys([...expandedKeys, key]);
    }
  };

  const addIconAttribute = (originTreeData: DataNode[]) => {
    const insertInputNode = (node?: DataNode) => {
      const _originData = cloneDeep(originData);
      const target = getItemByIdInTree(node?.key || '', _originData);
      const { children = [] } = target;
      if (!children.find((item) => item.key === 'insert')) {
        children.push({
          key: 'insert',
          title: (
            <Input.Group compact key={node?.key}>
              <Input
                style={{ width: '50%' }}
                onChange={(evt) => {
                  console.log(evt.target.value, node?.title);
                }}
              />
              <Input
                style={{ width: '50%' }}
                onChange={(evt) => {
                  console.log(evt.target.value, node?.title);
                }}
              />
            </Input.Group>
          ),
        });
        target.children = children;
      }
      const _treeData = addIconAttribute(_originData);
      setTreeData(_treeData);
    };
    const plusIcon: IconType = ({ data }) => (
      <PlusSquareOutlined
        onClick={(e) => {
          e.stopPropagation();
          const { key = '' } = data || {};
          openTreeNode(key);
          insertInputNode(data);
        }}
      />
    );
    for (let i = 0; i < originTreeData.length; i++) {
      if (originTreeData[i].key !== 'insert') {
        originTreeData[i].icon = plusIcon;
      }
      if (originTreeData[i].children && (originTreeData[i].children || []).length > 0) {
        addIconAttribute(originTreeData[i].children || []);
      }
    }
    return originTreeData;
  };

  useEffect(() => {
    const data = cloneDeep(treeData);
    const _treeData = addIconAttribute(data);
    setTreeData(_treeData);
  }, []);

  return <Tree ref={treeRef} showIcon treeData={treeData} switcherIcon={<DownOutlined />} />;
};
export default EditTree;
