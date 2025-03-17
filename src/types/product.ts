enum DURATION {
    DAYS = 'DAYS',
    MONTH = 'MONTH',
    MONTHS = 'MONTHS'
}

enum SIM_TYPE {
    ESIM = 'ESIM',
    PSIM = 'PSIM'
}

type Product = {
    id: string,
    name: string,
    sim_types: Array<string>,
    duration: number,
    duration_unit: string,
    data: number,
    data_unit: string,
    price: number,
    price_currency: string,
    footprint_code: string,
}

export default Product