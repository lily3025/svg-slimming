export {
    NodeType,
    IAttr,
    INode,
    Parser
} from './xml-parser';
import { INode } from './xml-parser';

export declare type ConfigItem = (boolean | string | string[] | number)[];
export interface IConfig {
    [propName: string]: boolean | ConfigItem;
}
export declare const config: IConfig;

interface ISvgSlimming {
    (data: string, userConfig?: IConfig): Promise<string>;
    xmlParser?(s: string): Promise<INode>;
    NodeType?: Object;
}
declare const exportFunc: ISvgSlimming;
export default exportFunc;
