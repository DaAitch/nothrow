import {nothrow} from "./nothrow";

describe('nothrow', () => {

    const names = <string[]>[
        'Alina',
        'Steve'
    ];

    it('should be able to access arrays', () => {
        expect(nothrow(() => names[0])).toBe('Alina');
        expect(nothrow(() => names[1])).toBe('Steve');
    });

    it('should return undefined for undefined array index access', () => {
        expect(nothrow(() => names[2])).toBeUndefined();
    });

    it('should return undefined for accessing array as object', () => {
        expect(nothrow(() => names['three'])).toBeUndefined();
    });


    const order = <any>{
        printer_1: <any>{
            price: 150.0,
            name: 'Printer 1'
        },
        printer_2: <any>{
            price: 400.0,
            name: undefined,
            available: 4
        }
    };

    it('should correctly access deep structures', () => {
        expect(nothrow(() => order.printer_1.name)).toBe('Printer 1');
    });

    it('should correctly access deep structures undefined index', () => {
        expect(nothrow(() => order.printer_1.available)).toBeUndefined();
    });

    it('should return undefined for NPEs 1', () => {
        expect(nothrow(() => order.printer_3.name)).toBeUndefined();
    });

    it('should return undefined for NPEs 2', () => {
        expect(nothrow(() => order.printer_2.name.substr(0, 1))).toBeUndefined();
    });
});