import React, { useState, Fragment } from "react";
import ReactExport from "react-data-export";

import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { download_cols } from "./download_cols";

const DownloadOption = ({ className }) => {
    const initialValue = {
        date_completed: "",
    };

    const [filters, setFilters] = useState(initialValue);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const csat_rcas = useSelector(({ surveys }) => surveys.csat_rcas);

    return (
        <Fragment>
            <Button color="success" onClick={toggle} className="ml-1">
                Download Data
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Download Data</ModalHeader>
                <ModalBody>
                    <div className="mb-2">
                        Filter goes here.. What to be filtered?
                    </div>
                    <div>
                        <Download data={csat_rcas} />
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default DownloadOption;

const Download = ({ data }) => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    return (
        <ExcelFile
            element={
                <Button size="sm" color="success">
                    Download
                </Button>
            }
            filename="TEST"
        >
            <ExcelSheet data={data} name="CSAT">
                {download_cols.map((item, index) => (
                    <ExcelColumn
                        key={index}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </ExcelSheet>
        </ExcelFile>
    );
};
