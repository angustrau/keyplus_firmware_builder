import FileSaver from 'file-saver';
import JSON5 from 'json5';

function ConfigSaver(kbcollection) {
    const blob = new Blob([ JSON5.stringify(kbcollection) ], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, kbcollection.name.replace(/[^\w_-]/gi, '') + '.kbconfig');
}

export default ConfigSaver;