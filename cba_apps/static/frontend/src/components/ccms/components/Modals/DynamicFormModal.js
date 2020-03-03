import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    get_selected_ccms,
    remove_selected_ccms
} from "../../../../actions/ccmsActions";

const DynamicFormModal = ({
    parentCallback,
    modal,
    formattedFormTitle,
    form_inputs,
    toggleModal,
    ComponentForm: ComponentForm,
    form_title,
    select_options,
    labelKey,
    size,
    ccms_entry
}) => {
    const selected_ccms = useSelector(state => state.ccms.selected_ccms);
    const dispatch = useDispatch();
    return (
        <div>
            <Button
                color="danger"
                onClick={() => {
                    dispatch(get_selected_ccms(ccms_entry));
                    toggleModal();
                }}
            >
                {formattedFormTitle}
            </Button>
            {selected_ccms ? (
                <Modal
                    isOpen={modal && selected_ccms.id === ccms_entry.id}
                    toggle={() => {
                        dispatch(remove_selected_ccms());
                        toggleModal();
                    }}
                    size={size}
                >
                    <ModalHeader
                        toggle={() => {
                            dispatch(remove_selected_ccms());
                            toggleModal();
                        }}
                    >
                        {formattedFormTitle}
                    </ModalHeader>
                    <ModalBody>
                        <ComponentForm
                            form_title={form_title}
                            form_inputs={form_inputs}
                            select_options={select_options}
                            labelKey={labelKey}
                            ccms_entry={ccms_entry}
                        />
                    </ModalBody>
                </Modal>
            ) : null}
        </div>
    );
};

export default DynamicFormModal;
