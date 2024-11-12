import CommonModal from "@/components/common/Modal"
import UploadImage from "@/components/feature/images/UploadImage";
import EditProfileForm from "@/components/feature/mypage/section/EditProfileForm";
import styled from "@emotion/styled";
import { useState } from "react";

type Props = {
    isModalOpen: boolean;
    handleModalClose: () => void;
}

const EditProfileModal = ({ isModalOpen, handleModalClose }: Props) => {
    const [imageKey, setImageKey] = useState('')
    return (
    <CommonModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
    >
        <Wrapper>
            <ImageContainer>
                <UploadImage 
                    setImageKey={setImageKey}
                    type="MEMBER"
                />
            </ImageContainer>
            <FormContainer>
                <EditProfileForm imageKey={imageKey} />
            </FormContainer>
        </Wrapper>
    </CommonModal>)
}

export default EditProfileModal;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 2rem);
`;

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const FormContainer = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;