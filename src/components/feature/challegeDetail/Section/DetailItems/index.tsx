import { useEffect,useState} from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@chakra-ui/react';
import VerificaitionCard from '../DetailCard';
import useChallengeVerification from '@/util/hooks/useVerificationFilter';
import { VerificationData } from '@/types';
import { useAuth } from '@/provider/Auth';
import CommonGrid from '@/components/common/Grid';
import VerificationDetailModal from '@/components/feature/modals/verification/ContentDetail';


type FilterType = 'MY_VERIFICATION' | 'ALL';

type VerificationSectionProps = {
  filterType: FilterType;
  verificationData: VerificationData[] | null;
  userId: number | null;
  challengeId: number | null;
};

const VerificationSection = ({ filterType, verificationData, userId, challengeId }: VerificationSectionProps) => {
  const { isLogin } = useAuth();
  const { filteredData, setFilter } = useChallengeVerification(verificationData || [], userId || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    setFilter(filterType);
  }, [filterType, setFilter]);

  const handleCardClick = (id: number) => {
    if (!isLogin) {
      window.location.href = '/login';
      return;
    }
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };


  
  return (
    <Wrapper>
      <Skeleton isLoaded={filteredData.length > 0}>
        <CommonGrid columns={4} gap={50}>
          <AnimatePresence>
            {filteredData.map((data) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ItemWrapper
                  onClick={() => handleCardClick(data.id)}
                >
                  <VerificaitionCard verificationData={data}
                  />
                </ItemWrapper>
              </motion.div>
            ))}
          </AnimatePresence>
        </CommonGrid>
      {/* </CommonGrid> */}
      {isModalOpen && selectedId !== null && (
        <VerificationDetailModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        challengeId={challengeId}
        verificationId={selectedId}
        />
        
      )}
      </Skeleton>
    </Wrapper>
  );
};

export default VerificationSection;

const Wrapper = styled.section`
  margin-top: 2rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled.div`
  width: 20vw;
  min-width: 10vw;
`;
