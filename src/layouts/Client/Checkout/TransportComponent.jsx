import React, { useEffect, useState, memo } from 'react';
import { Select } from 'antd';
import { alertErrors, url_get_district, url_get_province, url_get_ward } from '../../../settings/config';
import { apiTransport } from '../../../utils/callApi';
const { Option } = Select;

const styled = {
    fontSize: "13px",
    fontWeight: "500",
    color: "#f73232"
}

function TransportComponent(props) {
    const { fields, register, errors, required } = props;
    const [data, setData] = useState({
        province: [],
        district: [],
        ward: []
    });
    const [select, setSelect] = useState({
        province_id: null,
        district_id: null,
        ward_code: null,
        province_name: '',
        district_name: '',
        ward_name: ''
    });
    const [delivery, setDelivery] = useState(0);
    useEffect(() => {
        apiTransport(url_get_province).then(res => {
            if (res.data.code == 200) {
                setData({ ...data, province: res.data.data });
            }
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        });
    }, []);
    const changeProvince = (value) => {
        const province = value.split('-');
        apiTransport(`${url_get_district}?province_id=${province[0]}`).then(res => {
            setData({ ...data, district: res.data.data });
            setSelect({ ...select, province_id: province[0], province_name: province[1] });
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        });
    }
    const changeDistrict = (value) => {
        const district = value.split('-');
        apiTransport(`${url_get_ward}?district_id=${district[0]}`).then(res => {
            setData({ ...data, ward: res.data.data });
            setSelect({ ...select, district_id: district[0], district_name: district[1] });
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        });
    }
    return (
        <>
            <div className="checkout__shipping">
                <div className="checkout__shipping--title">Shipping Address</div>
                <div className="checkout__shipping--content">
                    <div className="row">
                        <div className="col-lg-6 col-12 mt-3">
                            <label htmlFor="province" className="form-label">
                                <span style={styled}>*</span>Province
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select province"
                                optionFilterProp="children"
                                onChange={changeProvince}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {
                                    data.province?.map(item => {
                                        return (
                                            <Option
                                                value={`${item.ProvinceID}-${item.ProvinceName}`} key={item.ProvinceID}>
                                                {item.ProvinceName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-lg-6 col-12 mt-3">
                            <label htmlFor="district" className="form-label">
                                <span style={styled}>*</span>District
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select province"
                                optionFilterProp="children"
                                onChange={changeDistrict}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {
                                    data.district?.map(item => {
                                        return (
                                            <Option value={`${item.DistrictID}-${item.DistrictName}`} key={item.DistrictID}>
                                                {item.DistrictName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-lg-6 col-12 mt-3">
                            <label htmlFor="ward" className="form-label">
                                <span style={styled}>*</span>Ward
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select province"
                                optionFilterProp="children"
                                onChange={(value) => props.getTransport(value, select)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                name="ward_id">
                                {
                                    data.ward?.map(item => {
                                        return (
                                            <Option value={`${item.WardCode}-${item.WardName}`} key={item.WardCode}>
                                                {item.WardName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                            {required &&
                                <span style={styled}>{required}</span>
                            }
                        </div>
                        <div className="col-lg-6 col-12 my-3">
                            <label htmlFor="address" className="form-label">
                                <span style={styled}>*</span>Address
                            </label>
                            <input type="text" {...register(fields.address)} name={fields.address} className="form-control" placeholder="Your address" />
                            {errors.address &&
                                <span style={styled}>{errors.address.message}</span>
                            }
                        </div>
                        <div className="checkout__transport">
                            <h4 className="transport__title">Select Delivery Option</h4>
                            <div className={delivery === 0 ? `transport__item active` : "transport__item"} onClick={() => setDelivery(0)}>
                                <img src="./assets/img/shipping-2.png" alt="*" />
                                <h5 className="transport__category">DHL Shipping</h5>
                            </div>
                            <div className={delivery === 1 ? `transport__item active` : "transport__item"} onClick={() => setDelivery(1)}>
                                <img src="./assets/img/shipping-3.png" alt="*" />
                                <h5 className="transport__category">DPD Shipping</h5>
                            </div>
                            <div className={delivery === 2 ? `transport__item active` : "transport__item"} onClick={() => setDelivery(2)}>
                                <img src="./assets/img/shipping-4.png" alt="*" />
                                <h5 className="transport__category">InPost Shipping</h5>
                            </div>
                            <div className={delivery === 3 ? `transport__item active` : "transport__item"} onClick={() => setDelivery(3)}>
                                <img src="./assets/img/shipping-1.png" alt="*" />
                                <h5 className="transport__category">GHN Shipping</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(TransportComponent);