export const setParams = (params = null) => {
  try {
    let _params = ``;
    let _index = 0;

    if(params) {
      _params += `?`;
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          if(_index !== 0) _params += '&'; 
          _params += (key + '=' + params[key]);
        }

        _index++;
      }
    }

    return _params;
  } catch (error) {
    console.log('set params error', error);
  }
}

export const setPersonNameCapitalize = (name) => {return name ? (name?.charAt(0).toUpperCase() + name?.slice(1)) : 'Anonymous Person';}