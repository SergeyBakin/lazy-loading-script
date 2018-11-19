import { IMetaDataScript }  from "../models/script-loading";

export const scriptsPrivate: any = {
    'filepicker': {name: 'filepicker', src: 'https://api.filestackapi.com/filestack.js'}
};

export const scriptOne: IMetaDataScript = {
    name: 'filepicker',
    src: 'https://api.filestackapi.com/filestack.js',
    loaded: false
};
