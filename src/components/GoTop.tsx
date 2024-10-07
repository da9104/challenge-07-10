import React from 'react';
import { ChevronUp } from 'lucide-react';
import './GoTop.styles.modules.scss'

interface GoTopProps {
  showGoTop: string;
  scrollUp: () => void;
}

const GoTop: React.FC<GoTopProps> = ({ showGoTop, scrollUp }) => {
    return (
      <>
        <div className={ showGoTop ? "goTop" : "goTopHidden" } onClick={scrollUp}>
          <button className="goTop">
              <ChevronUp className='' />
          </button>
        </div>
      </>
    );
  };
  export default GoTop;
  