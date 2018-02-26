import nodeJsonRepr from './nodeJsonRepr';
import nodePlainRepr from './nodePlainRepr';

const renderers = {
  json: nodeJsonRepr,
  plain: nodePlainRepr,
};

const getNodeRenderer = format => renderers[format];
export default getNodeRenderer;
