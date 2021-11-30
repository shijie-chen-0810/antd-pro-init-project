import React, { useEffect, useState } from 'react';
import ProForm from '@ant-design/pro-form';
import { Tag, Button, Modal, Divider } from 'antd';
import type { FormItemProps } from '@ant-design/pro-form';
import CheckableTag from 'antd/es/tag/CheckableTag';

type FieldProps = {
  btnText?: string;
};
export type ProFormComplexPickerProps = {
  fieldProps?: FieldProps;
} & FormItemProps;

export type TagPickerProps = {
  value?: any[];
  onChange?: (value?: any[]) => void;
  fieldProps?: FieldProps;
};

const tagsData = [
  {
    id: '1',
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        parentId: '1',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        parentId: '1',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        parentId: '1',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        parentId: '1',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
  {
    id: `${Math.floor(Math.random() * 1000000)}`,
    createTime: '@datetime',
    creatorName: '@cname',
    description: '@ctitle(5,10)',
    isShow: 0,
    labelName: '@ctitle(5,10)',
    children: [
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
      {
        createTime: '@datetime',
        creatorName: '@cname',
        description: '@ctitle(5,10)',
        id: `${Math.floor(Math.random() * 1000000)}`,
        isShow: 0,
        labelName: '@ctitle(5,10)',
      },
    ],
  },
];

const TagPicker: React.FC<TagPickerProps> = ({ value, fieldProps, ...resArg }) => {
  const [tags, setTags] = useState<any[]>([{ id: 1, labelName: 'label1' }]);
  const [visible, setVisible] = useState(false);
  const { btnText = '选择标签' } = fieldProps || {};
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  useEffect(() => {
    resArg.onChange?.([{ id: 1, labelName: 'label1' }]);
  }, []);

  const handleChange = (tag: any, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.id !== tag.id);
    setSelectedTags(nextSelectedTags);
  };
  const handleCloseTag = (id: string) => {
    const newTags = selectedTags.filter((item) => item.id !== id);
    setTags(newTags);
    setSelectedTags(newTags);
    resArg.onChange?.(newTags);
  };
  const onSubmit = () => {
    setTags(selectedTags);
    resArg.onChange?.(selectedTags);
    setVisible(false);
  };
  return (
    <>
      客户标签：
      <Button size="small" style={{ marginRight: '8px' }} onClick={() => setVisible(true)}>
        {btnText}
      </Button>
      <Modal
        title="客户标签"
        width={560}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => onSubmit()}
      >
        <div>
          {tagsData?.map((tag: any) => {
            return (
              <div key={tag.id}>
                <div>{tag.labelName}</div>
                <div>
                  {tag.children?.map((subTag: any) => {
                    return (
                      <CheckableTag
                        style={{ marginBottom: '10px' }}
                        key={subTag.id}
                        checked={selectedTags.some((t) => Number(t.id) === Number(subTag.id))}
                        onChange={(checked) => handleChange(subTag, checked)}
                      >
                        {subTag.labelName}
                      </CheckableTag>
                    );
                  })}
                  {tag.children.length ? null : <span style={{ color: 'gray' }}>暂无子标签</span>}
                  <Divider style={{ margin: '5px 0px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      {tags.map((item) => {
        return (
          <Tag
            key={item.id}
            color="blue"
            style={{ marginBottom: '5px' }}
            closable
            onClose={(e) => {
              e.preventDefault();
              handleCloseTag(item.id);
            }}
          >
            {item.labelName}
          </Tag>
        );
      })}
    </>
  );
};

const ProFormTagPicker: React.FC<ProFormComplexPickerProps> = (props) => {
  const { fieldProps } = props;
  return (
    <ProForm.Item name="tags">
      <TagPicker fieldProps={fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormTagPicker;
