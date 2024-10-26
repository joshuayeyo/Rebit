import CommonModal from "@/components/common/Modal";
import PostStoryModal from "@/components/feature/modals/stories/PostStory";
import { Flex } from "@chakra-ui/react";
import styled from '@emotion/styled';
import { useState } from "react";

type Props = {
    isDropdownVisible: boolean;
    setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>; 
    handleModalClose: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (visible: boolean) => void;
}

const PostFeedsButton = ({isDropdownVisible, setIsDropdownVisible, handleModalClose, isModalOpen, setIsModalOpen}: Props) => { 
    const [isHovered, setIsHovered] = useState(false);

    const handlePostStoryButton = () => {
        setIsDropdownVisible(false);
        setIsModalOpen(true);
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsDropdownVisible(true);
    }

    const HandleMouseLeave = () => {
        setIsHovered(false)
        setIsDropdownVisible(false); 
    }

    return (
        <Flex position="fixed" bottom="30px" right="3vw">
            <Button onMouseEnter={handleMouseEnter} onMouseLeave={() => {setIsHovered(false)}} isHovered={isHovered}>
                + 포스트 작성
            </Button>
            {isDropdownVisible && (
                <Dropdown onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={HandleMouseLeave}>
                    <DropdownItem onClick={handlePostStoryButton}>스토리 작성</DropdownItem>
                    <DropdownItem>인생책 작성</DropdownItem>
                </Dropdown>
            )}
            {isModalOpen && (
                <PostStoryModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
            )}
        </Flex>
    );

}

export default PostFeedsButton;

const commonStyle = `
    background-color: #474747;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 15px 10px 10px;
    width: 100%;
    text-align: center;
    min-width: 150px;
`


const Button = styled.button<{ isHovered: boolean }>`
    ${commonStyle}
    border-radius: 20px;
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0.8)};
    border-top-left-radius: ${({ isHovered }) => (isHovered ? "0px" : "20px")};
    border-top-right-radius: ${({ isHovered }) => (isHovered ? "0px" : "20px")};
`

const Dropdown = styled.div`
    position: absolute;
    top: -200%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #474747;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    min-width: 150px;
    overflow: hidden;
    z-index: 10;
`;

const DropdownItem = styled.button`
    ${commonStyle}
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    border: none;
    opacity: 0.9;
    &:hover {
        background-color: #5a5a5a;
        opacity: 1;
    }
    &:first-of-type {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    &:last-of-type {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;