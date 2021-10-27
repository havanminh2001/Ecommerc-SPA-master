export const makeid = (length, id) => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result += id;
}

export const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

export const formatCurrency = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const returnStatus = (status) => {
    switch (status) {
        case 1:
            return "Comfirmation";
        case 2:
            return "Delivering";
        case 3:
            return "Delivered"
        case 4:
            return "Cancel"
        default:
            break;
    }
}

export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getMonthByString = (str) => {
    switch (parseInt(str)) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec"
        default:
            break;
    }
}

export const renderMonth = () => {
    const data = Array.from({ length: 12 });
    return data.map((i, index) => {
        return <option value={index + 1} key={index}>{index + 1}</option>
    })
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const renderBreadcrumb = (length, arr) => {
    switch (length) {
        case 3:
            return capitalizeFirstLetter(arr[length - 1]);
        case 4:
            return `${capitalizeFirstLetter(arr[length - 2])} / ${capitalizeFirstLetter(arr[length - 1])}`;
        case 5:
            return `${capitalizeFirstLetter(arr[length - 3])} / ${capitalizeFirstLetter(arr[length - 2])}`;
        case 6:
            return `${capitalizeFirstLetter(arr[length - 4])} / ${capitalizeFirstLetter(arr[length - 1])}`;
        default:
            break;
    }
}