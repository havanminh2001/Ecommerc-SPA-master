import React from 'react'

const styled = {
    fontSize: "13px",
    fontWeight: "500",
    color: "#f73232"
}

export default function CustomerComponent(props) {
    const { fields, register, errors } = props;
    return (
        <>
            <div className="checkout__info">
                <div className="checkout__info--title">Your Personal Details</div>
                <div className="checkout__info--content">
                    <div className="row">
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="first-name" className="form-label">
                                <span style={styled}>*</span>First Name
                            </label>
                            <input type="text" {...register(fields.firstName)}
                                name={fields.firstName} className="form-control"
                                placeholder="First Name" />
                            {errors.firstName &&
                                <span style={styled}>{errors.firstName.message}</span>
                            }
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="last-name" className="form-label">
                                <span style={styled}>*</span>Last Name
                            </label>
                            <input type="text" {...register(fields.lastName)} name={fields.lastName} className="form-control" placeholder="Last Name" />
                            {errors.lastName &&
                                <span style={styled}>{errors.lastName.message}</span>
                            }
                        </div>
                        <div className="col-lg-6 col-12 my-3">
                            <label htmlFor="email" className="form-label">
                                <span style={styled}>*</span>Email Address
                            </label>
                            <input type="email" {...register(fields.email)} name={fields.email} className="form-control" placeholder="Email address" />
                            {errors.email &&
                                <span style={styled}>{errors.email.message}</span>
                            }
                        </div>
                        <div className="col-lg-6 col-12 my-lg-3 mb-4">
                            <label htmlFor="phone" className="form-label">
                                <span style={styled}>*</span>Phone Number
                            </label>
                            <input type="phone" {...register(fields.phone)} className="form-control" placeholder="Phone Number" />
                            {errors.phone &&
                                <span style={styled}>{errors.phone.message}</span>
                            }
                        </div>
                        <div className="col-12">
                            <label htmlFor="note" className="form-label">
                                Note
                            </label>
                            <textarea className="form-control" {...register('note')} name="note" rows={3} defaultValue={""} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
