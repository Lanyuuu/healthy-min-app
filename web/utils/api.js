var HOST_URI = 'http://localhost:3000/web/api';

function _obj2uri(obj){
    if (obj == null) {
        return "openid=" + wx.getStorageSync("openid")
    }

    var p = Object.keys(obj).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join('&');
    p = p + "&openid=" +  wx.getStorageSync("openid")
    return p
}

function _search(o) {
    return  HOST_URI + '/food?' + _obj2uri(o);
}

function _foodInfo(o) {
    return HOST_URI + "/food?" + _obj2uri(o);
}

function _eat(o) {
    return HOST_URI + "/eat?" + _obj2uri(o);
}

function _eatDates(o) {
    return HOST_URI + "/dates?" + _obj2uri(o);
}

function _wxLogin(o) {
    return HOST_URI + "/login?" + _obj2uri(o);
}

function _exercise(o) {
    return HOST_URI + "/exercise?" + _obj2uri(o);
}

function _run(o) {
    return HOST_URI + "/run?" + _obj2uri(o);
}

function _userInfo(o) {
    return HOST_URI + "/user?" + _obj2uri(o);
}

function _scanCode(o) {
    return HOST_URI + "/scan/code?" + _obj2uri(o);
}

function _eatRank(o) {
    return HOST_URI + "/rank?" + _obj2uri(o);
}

function _eatCurrent(o) {
    return HOST_URI + "/current?" + _obj2uri(o);
}

module.exports = {
    search: _search,
    foodInfo : _foodInfo,
    Eat:_eat,
    EatDates:_eatDates,
    wxLogin:_wxLogin,
    Exercise:_exercise,
    Run:_run,
    userInfo:_userInfo,
    scanCode:_scanCode,
    EatRank : _eatRank,
    EatCurrent:_eatCurrent
};