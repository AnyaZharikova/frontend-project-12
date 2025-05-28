import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  add: AddChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
};

export default (modalType) => modals[modalType];
