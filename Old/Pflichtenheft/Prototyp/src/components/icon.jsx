import React from 'react';
import { propOr, concat, isNil } from 'ramda';
import PropTypes from 'prop-types';

import * as MdIcons from 'react-icons/lib/md';
import * as FaIcons from 'react-icons/lib/fa';
import * as TiIcons from 'react-icons/lib/ti';
import * as GoIcons from 'react-icons/lib/go';
import * as IoIcons from 'react-icons/lib/io';

const IconPacks = {
  Md: MdIcons,
  Fa: FaIcons,
  Ti: TiIcons,
  Go: GoIcons,
  Io: IoIcons,
};

const Icon = ({ type, pack, ...props }) => {
  const IconName = concat(pack, type);
  const IconPack = propOr({}, pack, IconPacks);
  const IconFromPack = propOr(null, IconName, IconPack);

  return isNil(IconFromPack) ? null : <IconFromPack {...props} />;
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  pack: PropTypes.oneOf(['Md', 'Fa', 'Ti', 'Go', 'Io']),
};

Icon.defaultProps = {
  pack: 'Md',
};

export default Icon;
