import request from 'libs/js/request_aws';
const getCustomerList = data => request.post('getCustomerStatisticsList/v1', data);
const getProductList = data => request.post('getProductStatisticsList/v1', data);
const getArtistList = data => request.post('getArtistList/v1', data);
const getBannerList = data => request.post('getBannerList/v1', data);

export {
    getCustomerList,
    getProductList,
    getArtistList,
    getBannerList
};