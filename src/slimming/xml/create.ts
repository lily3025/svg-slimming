import { INode, NodeType } from '../../node/index';
import { mixWhiteSpace } from '../utils/mix-white-space';
import { ITagNode } from '../interface/node';

export function createNode(node: INode): string {
	let xml = '';
	const textContent = node.textContent;
	switch (node.nodeType) {
		case NodeType.Tag:
			xml += createTag(node as ITagNode);
			break;
		case NodeType.Text:
			xml += textContent;
			break;
		case NodeType.XMLDecl:
			xml += `<?xml${mixWhiteSpace(` ${textContent}`).replace(/\s(?="|=|$)/g, '')}?>`;
			break;
		case NodeType.Comments:
			const comments = mixWhiteSpace(textContent as string).trim();
			if (comments) {
				xml += `<!--${comments}-->`;
			}
			break;
		case NodeType.CDATA:
			if ((textContent as string).indexOf('<') === -1) {
				xml += textContent;
			} else {
				xml += `<![CDATA[${textContent}]]>`;
			}
			break;
		case NodeType.DocType:
			xml += `<!DOCTYPE${mixWhiteSpace(` ${(textContent as string).trim()}`)}>`;
			break;
		default:
			break;
	}
	return xml;
}

export function createTag(node: ITagNode): string {
	let xml = '';
	xml += `<${node.namespace ? `${node.namespace}:` : ''}${node.nodeName}`;
	if (node.attributes.length) {
		for (const { name, value, namespace } of node.attributes) {
			if (value.trim()) {
				xml += ` ${namespace ? `${namespace}:` : ''}${name}="${mixWhiteSpace(value.trim()).replace(/"/g, '&quot;')}"`;
			}
		}
	}

	if (node.childNodes.length) {
		xml += '>';
		node.childNodes.forEach(childNode => {
			xml += createNode(childNode);
		});
		xml += `</${node.namespace ? `${node.namespace}:` : ''}${node.nodeName}>`;
	} else {
		xml += '/>';
	}
	return xml;
}

export const createXML = (dom: ITagNode | undefined | null): string => {
	if (!dom) {
		return '';
	}

	let result = '';
	dom.childNodes.forEach(node => {
		result += createNode(node);
	});

	return result;
};
