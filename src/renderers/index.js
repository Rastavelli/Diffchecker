import nodeJsonRepr from './nodeJsonRepr';
import nodePlainRepr from './nodePlainRepr';
import nodeTreeRepr from './nodeTreeRepr';

const renderers = {
  json: nodeJsonRepr,
  plain: nodePlainRepr,
  tree: nodeTreeRepr,
};

const getNodeRenderer = format => renderers[format];
export default getNodeRenderer;
