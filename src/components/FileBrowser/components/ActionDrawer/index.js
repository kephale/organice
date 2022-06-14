// INFO: There's an <ActionDrawer> component within the <OrgFile>
// component, as well.

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './../../../OrgFile/components/ActionDrawer/stylesheet.css';

import * as orgActions from '../../../../actions/org';
import * as syncActions from '../../../../actions/sync_backend';

import ActionButton from '../../../OrgFile/components/ActionDrawer/components/ActionButton';

const ensureCompleteFilename = (fileName) => {
  return fileName.endsWith('.org') ? fileName : `${fileName}.org`;
};

const ActionDrawer = ({ org, syncBackend, path }) => {
  const handleAddNewOrgFileClick = () => {
    const content = '* First header\nExtend the file from here.';
    let fileName = prompt('New filename:');
    fileName = ensureCompleteFilename(fileName);
    let newPath = `${path}/${fileName}`;
    syncBackend.createFile(newPath, content);
    org.addNewFile(newPath, content);
  };

  const mainButtonStyle = {
    opacity: 1,
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div className="action-drawer-container nice-scroll">
      {
        <Fragment>
          <div
            className="action-drawer__capture-buttons-container"
            style={{
              marginLeft: 'auto',
              marginRight: 0,
            }}
          >
            <ActionButton
              iconName="plus"
              isDisabled={false}
              onClick={handleAddNewOrgFileClick}
              style={mainButtonStyle}
              tooltip="Add new Org file"
            />
          </div>
        </Fragment>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const path = state.syncBackend.get('currentPath');
  return {
    path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    org: bindActionCreators(orgActions, dispatch),
    syncBackend: bindActionCreators(syncActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionDrawer);
