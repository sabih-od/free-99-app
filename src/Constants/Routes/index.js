import { setParams } from "../../Helpers/Utils";

export const Routes = {
  chatMessages: (id = null, params = null) => {
    return `/messages/${id}${setParams(params)}`;
  },
  vendorParticipants: (params = null) => {
    return `/vendor-participants${setParams(params)}`;
  }
};
