import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EstimateDetail(props, { ektour }) {

  const navigate = useNavigate();
  const { page, estimateId } = useParams();

  // 견적 수정 모드 boolean
  const [modify, setModify] = useState(false);
  const handleClickModifyEstimate = () => { setModify(!modify); }

  return (
    <>
      
    </>
  );
}