/* eslint-disable no-param-reassign */
import { cloneDeep } from 'lodash';
import { Quill } from 'react-quill';

const Link = Quill.import('formats/link'); // 导出link模块的formats方法
const BaseVideo = Quill.import('formats/video');

const fontSizeStyle = Quill.import('attributors/style/size'); //引入这个后会把样式写在style上
fontSizeStyle.whitelist = ['14px', '12px', '16px', '18px', '20px', '22px', '24px'];

const BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];

class MyVideo extends BaseVideo {
  static create(value: any) {
    const node = super.create();
    node.setAttribute('src', value.url);
    node.setAttribute('width', '80%');
    node.setAttribute('controls', 'controls');
    node.setAttribute('style', 'margin: 0 auto');
    node.setAttribute('webkit-playsinline', true);
    node.setAttribute('playsinline', true);
    node.setAttribute('disablePictureInPicture', true);
    node.setAttribute('controlsList', 'nofullscreen nodownload noremoteplayback');
    return node;
  }
  static value(node: any) {
    return {
      url: node.getAttribute('src'),
    };
  }
}
MyVideo.tagName = 'video';

class ImageFormat extends BaseImageFormat {
  static formats(domNode: any) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name: any, value: any) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

class MyLink extends Link {
  // 继承父类
  static create(value: any) {
    const originValue = cloneDeep(value);
    const node = super.create(typeof originValue === 'string' ? value : value.link); //调用父类的方法生成node节点
    value = this.sanitize(value); // 使用sanitize取出value
    if (typeof value === 'string') {
      //判断是否拥有协议前缀 无则添加默认前缀
      if (!(value.indexOf('http://') === 0 || value.indexOf('https://') === 0)) {
        value = 'http://' + value;
      }
    } else {
      value = value?.link;
    }
    // 设置href属性
    node.setAttribute('href', value);
    if (typeof originValue !== 'string') {
      node.innerText = originValue.title;
    }
    return node;
  }
}

const BlockEmbed = Quill.import('blots/block/embed');
class AppPanelEmbed extends BlockEmbed {
  static create(value: any) {
    const node = super.create(value);
    node.setAttribute('width', '100%');
    node.innerHTML = value;
    return node;
  }
  // 返回节点自身的value值 用于撤销操作
  static value(node: any) {
    return node.innerHTML;
  }
}
// blotName
AppPanelEmbed.blotName = 'custom-panel';
// class名将用于匹配blot名称
AppPanelEmbed.className = 'ql-custom-panel';
// 标签类型自定义
AppPanelEmbed.tagName = 'div';
Quill.register(AppPanelEmbed, true);

Quill.register(MyLink, true);
Quill.register(fontSizeStyle, true);
Quill.register(ImageFormat, true);
Quill.register(MyVideo, true);
// Quill.register(UploadLink, true);
