import styled from "@emotion/styled"
import instance from "@/api/instance";
import { useEffect, useState } from "react";
import WishCard from "@/components/feature/cards/WishCards";
import CommonGrid from "@/components/common/Grid";
import { BookData, ChallengeData } from "@/types";

const UserWishes = ({filter}: {filter: string})  => {
    const [challengeId, setChallengeId] = useState<number[]>([]);
    const [challengeData, setChallengeData] = useState<ChallengeData[]>([]);
    const [bookIsbn, setBookIsbn] = useState<string[]>([]);
    const [bookData, setBookData] = useState<BookData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);  

    useEffect(() => {
        async function getChallengeWishes() {
            try {
                const res = await instance.get(`api/wishes/challenges`);
                const idList = res.data.content.map((challenge: { challengeId: number }) => challenge.challengeId);
                setChallengeId(idList)
            } catch (e) {
                console.log(e);
            }
        }
        getChallengeWishes();
    }, []);

    useEffect(() => {
        async function getBookWishes() {
            try {
                const res = await instance.get(`api/wishes/books`);
                const isbnList = res.data.content.map((book: { isbn: string }) => book.isbn);
                setBookIsbn(isbnList)
            } catch (e) {
                console.log(e);
            }
        }
        getBookWishes();
    }, []);    

    useEffect(() => {
        if (bookIsbn && bookIsbn.length > 0) { 
            async function getBookDetails() {
                try {
                    const bookDetails = await Promise.all(
                        bookIsbn.map((isbn) =>
                            instance.get(`api/books/${isbn}`).then((res) => res.data)
                        )
                    );
                    setBookData(bookDetails);
                } catch (e) {
                    console.log(e);
                }
            }
            getBookDetails();
        }
    }, [bookIsbn]);

    useEffect(() => {
        if (challengeId && challengeId.length > 0) { 
            async function getChallengeDetails() {
                try {
                    const challengeDetails = await Promise.all(
                        challengeId.map((id) =>
                            instance.get(`api/challenges/${id}`).then((res) => res.data)
                        )
                    );
                    setChallengeData(challengeDetails);
                } catch (e) {
                    console.log(e);
                }
            }
            getChallengeDetails();
        }
    }, [challengeId]);

    const renderContent = () => {
        if (filter === 'Book') {
            return bookData?.map((book: BookData, index) => (
                <ItemWrapper key={index}>
                    <WishCard
                        imageUrl={book.cover || ""}
                        title={book.title || ""}
                        author={book.author || ""}
                    />
                </ItemWrapper>
            ));
        }

        if (filter === 'Challenge') {
            return challengeData?.map((challenge: ChallengeData, index) => (
                <ItemWrapper key={index}>
                    <WishCard
                        imageUrl={challenge.presignedUrl || ""}
                        title={challenge.title || ""}
                        author={challenge.creator.nickname || ""}
                    />
                </ItemWrapper>
            ));
        }

        return null;
    };

    const fetchData = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    return(
        <Wrapper>
            <CommonGrid columns={4} gap={50}>
                {renderContent()}
            </CommonGrid>
        </Wrapper>
    )
}

export default UserWishes;

const Wrapper = styled.section`
    margin-top: 2rem;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ItemWrapper = styled.button`
    width: 18vw;
    min-width: 10vw;
`;

