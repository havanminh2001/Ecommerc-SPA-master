import React, { useEffect, useState } from 'react'
import * as service from '../../../../../../services/admin/product';

export default function FormOption(props) {
    const { register, errors, option, setValue } = props;
    const [visiable, setVisiable] = useState(true);
    useEffect(() => {
        setValue("screen", option?.screen);
        setValue("screen_resolution", option?.screen_resolution);
        setValue("operating_system", option?.operating_system);
        setValue("cpu", option?.cpu);
        setValue("gpu", option?.gpu);
        setValue("camera_fr", option?.camera_fr);
        setValue("camera_be", option?.camera_be);
        setValue("pin", option?.pin);
    }, [option, setValue]);
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <a href="*" onClick={(e) => { e.preventDefault(); setVisiable(!visiable) }} className="btn btn-primary">{visiable ? "Add Option" : "Hide Option"}</a>
                </div>
            </div>
            <div className="form__option row" style={visiable ? { display: "none" } : {}}>
                <div className="col-3 mb-3">
                    <label htmlFor="screen" className="form-label">Screen</label>
                    <input type="text" {...register('screen')} className="form-control" name="screen" placeholder='OLED 6" ' />
                    {errors.screen && <p style={service.errors}>{errors.screen.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="screen-resolution" className="form-label">Screen Resolution</label>
                    <input type="text" {...register('screen_resolution')} className="form-control" name="screen_resolution" placeholder="767x1376" />
                    {errors.screen_resolution && <p style={service.errors}>{errors.screen_resolution.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="operating-system" className="form-label">Operating System</label>
                    <input type="text" {...register('operating_system')} className="form-control" name="operating_system" placeholder="iOS 14" />
                    {errors.operating_system && <p style={service.errors}>{errors.operating_system.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="cpu" className="form-label">CPU</label>
                    <input type="text" {...register('cpu')} className="form-control" name="cpu" placeholder="A15 Bionic" />
                    {errors.cpu && <p style={service.errors}>{errors.cpu.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="gpu" className="form-label">GPU</label>
                    <input type="text" {...register('gpu')} className="form-control" name="gpu" placeholder="Apple 4 core" />
                    {errors.gpu && <p style={service.errors}>{errors.gpu.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="camera-front" className="form-label">Camera Front</label>
                    <input type="text" {...register('camera_fr')} className="form-control" name="camera_fr" placeholder="12MP" />
                    {errors.camera_fr && <p style={service.errors}>{errors.camera_fr.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="camera-rear" className="form-label">Camera Rear</label>
                    <input type="text" {...register('camera_be')} className="form-control" name="camera_be" placeholder="16MP" />
                    {errors.camera_be && <p style={service.errors}>{errors.camera_be.message}</p>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="screen" className="form-label">Pin</label>
                    <input type="text" {...register('pin')} className="form-control" name="pin" placeholder="Lion 4250 mAh - 25W" />
                    {errors.pin && <p style={service.errors}>{errors.pin.message}</p>}
                </div>
            </div>
        </>
    )
}
