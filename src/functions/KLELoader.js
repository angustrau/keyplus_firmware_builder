import KBCollection from './KBCollection';
import config from './../config.js';

// Creates a Promise<Keyboard> instance from KLE raw data
function KLELoader(kleData) {
    return new Promise((reject, resolve) => {
        try {
            let layout = [];
            const kle = JSON.parse('[' + kleData.trim() + ']');

            if (kle[0] instanceof Object) {
                kle.shift();
            }

            let x = 0;
            let y = 0;
            let row = 0;
            let column = 0;
            // Non persistent values
            let width = 1;
            let height = 1;
            let x2 = 0;
            let y2 = 0;
            let w2 = 0;
            let h2 = 0;
            let decal = false;

            kle.forEach((row) => {
                x = 0;
                column = 0;

                row.forEach((column) => {
                    if (column instanceof Object) {
                        // Item is a modifier instead of key data
                        const mod = column;
                        x += mod.x || 0;
                        y += mod.y || 0;
                        width = mod.w || width;
                        height = mod.h || width;
                        x2 = mod.x2 || x2;
                        y2 = mod.y2 || y2;
                        w2 = mod.w2 || w2;
                        h2 = mod.h2 || h2;
                        decal = mod.d !== undefined ? mod.d : decal;
                        return;
                    }

                    layout.push({
                        x,
                        y,
                        width,
                        height,
                        x2,
                        y2,
                        w2,
                        h2,
                        row,
                        column
                    });

                    x++;
                    column++;
                    // Reset values that only apply to this key
                    width = 1;
                    height = 1;
                    x2 = 0;
                    y2 = 0;
                    w2 = 0;
                    h2 = 0;
                    decal = false;
                });

                y++;
                row++;
            });

            resolve(new KBCollection({
                majorVersion: config.SchemaMajorVersion,
                minorVersion: config.SchemaMinorVersion,
                keyboards: [
                    {
                        name: 'Untitled keyboard',
                        layout,
                        matrixRows: row + 1,
                        matrixColumns: column + 1
                    }
                ]
            }));
        } catch(err) {
            reject(err.message);
        }
    });
}

export default KLELoader;