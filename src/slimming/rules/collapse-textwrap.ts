import { INode } from '../../node/index';
import { regularTag } from '../const/regular-tag';
import { isTag } from '../xml/is-tag';
import { traversalNode } from '../xml/traversal-node';
import { ConfigItem } from '../config/config';
import { ITagNode } from '../interface/node';

export const collapseTextwrap = async (rule: ConfigItem, dom: INode): Promise<null> => new Promise((resolve, reject) => {
	if (rule[0]) {
		traversalNode<ITagNode>(isTag, node => {
			const tagDefine = regularTag[node.nodeName];
			// 规则执行的前提：文本容器嵌套关系
			if (tagDefine.containTextNode && node.parentNode && regularTag[node.parentNode.nodeName].containTextNode) {
				const attributes = node.attributes;
				for (let i = attributes.length; i--;) {
					// 只要有一个非空属性，就不执行塌陷
					if (attributes[i].value.trim()) {
						return;
					}
				}
				node.parentNode.replaceChild(node, ...node.childNodes);
			}
		}, dom);
	}
	resolve();
});
