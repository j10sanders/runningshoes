import { FlexBox } from "./Styles";
import styled from "@emotion/styled";
import { motion, MotionProps } from "framer-motion";

const StyledCircle = styled(motion.div)`
  background-color: #000;
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

const animateY = [12, 2, 12];

const baseTransition = {
  duration: 0.8,
  repeat: Infinity,
};

const BaseAnimatedCircle: React.FC<MotionProps> = (props) => {
  return (
    <StyledCircle
      animate={{ y: animateY }}
      transition={baseTransition}
      {...props}
    />
  );
};

export const AnimatedLoadingDots = () => {
  return (
    <FlexBox columnGap={4}>
      <BaseAnimatedCircle />
      <BaseAnimatedCircle transition={{ ...baseTransition, delay: 0.2 }} />
      <BaseAnimatedCircle transition={{ ...baseTransition, delay: 0.4 }} />
    </FlexBox>
  );
};
