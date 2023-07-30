import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import styled from "@emotion/styled";

const Space = styled(Box)({
  marginTop: "22px",
});

export default function MobileServiceCenter(props) {
  const data = props.companyData;

  return (
    <>
      <Stack sx={{ borderBottom: "1px dotted orange" }} pb={5}>
        <img src='/image/top-decorate.png' alt='top-decorate' />

        <Space />

        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
        >
          이케이 하나 관광 고객 센터
        </Typography>

        <Space />
        <Space />

        <Stack
          direction='row'
          sx={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Stack
            textAlign='center'
            sx={{ border: "1px solid lightgray", borderRadius: "10px" }}
            p={2}
          >
            <Typography color='green' fontWeight='bold'>
              고객센터
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              {data.tel}
            </Typography>
          </Stack>

          <Stack
            textAlign='center'
            sx={{ border: "1px solid lightgray", borderRadius: "10px" }}
            p={2}
          >
            <Typography color='green' fontWeight='bold'>
              상담문의
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              {data.phone}
            </Typography>
          </Stack>
        </Stack>

        <Space />

        <Stack
          direction='row'
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <PhoneInTalkRoundedIcon sx={{ marginRight: 1 }} />
          <Typography textAlign='center' fontSize='15px'>
            상담 가능 시간 : <strong>9시~18시</strong>
          </Typography>
        </Stack>

        <Typography variant='caption' textAlign='center' color='gray'>
          업무시간 이외에도 전화주시면 친절히 상담해 드립니다.
        </Typography>

        <Space />

        <Box sx={{ width: "250px", margin: "0 auto" }}>
          <Typography fontSize={15}>
            카카오톡 : <u>{data.kakaoTalkId}</u>
          </Typography>
          <Typography fontSize={15}>
            이메일 : <u>{data.email}</u>
          </Typography>
        </Box>
      </Stack>

      <Box p={3}>
        <Accordion style={{ borderRadius: "20px" }}>
          <AccordionSummary
            style={{ borderRadius: "20px" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <ArticleOutlinedIcon />
            &nbsp;&nbsp;<strong>취소 및 환불 규정</strong>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ fontSize: "0.8em", wordBreak: "keep-all" }}>
              <strong>
                * 전세버스 대절의 취소에 따른 환불은 당사의 취소 및 환불규정에
                따라 운임을 환불합니다.
              </strong>
              <br />
              <br />

              <Typography
                sx={{ fontSize: "0.7em", color: "gray", lineHeight: "2.5em" }}
              >
                당사의 환불규정은 적합한 상거래 및 상도덕에 준하며 전세버스 표준
                약관에 준합니다.
                <br />
                취소 및 환불에 대한 규정은 예약 부도에 대한 당사의 손해를
                방지하고 장기적으로 고객님들에게 보다 나은 서비스를 제공하는
                차원에서 부과됩니다.
                <br />
                특히 전세/관광버스의 특성상 운임요금 및 성수기와 비수기의 수요
                공급에 따라 다르게 책정되오며 임차 운임자체가 비싸고 미리 예약된
                버스 및 운행 예약이 취소가 되면 다른 고객과의 계약이 불가능하게
                되므로 운휴대체비용이 부가되는 것입니다.
                <br />
                <br />
                단, 운수 회사의 귀책으로 운행을 못하게 되었을 시 운수회사는
                예약금의 100%를 고객에게 지급해야 합니다.
                <br />
                <br />
                이외에 민법의 규정에도 계약은 상호 신의 성실의 원칙에 따라
                지켜져야 한다고 규정되어 있으며, 규정되지 않은 사항에 대해서는
                상호간의 합의에 따라 해지 및 환불을 해드리고 있습니다.
              </Typography>

              <br />
              <strong>
                * 차량 사용일 5일전부터 취소에 대한 환불규정이 책정됩니다.
              </strong>
              <br />

              <br />
              <strong>
                * 취소 및 환불규정은 비수기와 성수기에 구분됩니다.
              </strong>

              <Typography
                sx={{ fontSize: "1em", color: "green", fontWeight: "bold" }}
              >
                <br />
                📅 성수기 : 4월~5월, 9월~10월
              </Typography>

              <Typography
                sx={{ fontSize: "0.7em", color: "gray", lineHeight: "2.5em" }}
              >
                - 운행예정일 (5일전 이후) 취소시 예약금액의 100% 환불
                <br />
                - 운행예정일 (5일전~3일전까지) 취소시 예약금액의 50% 환불
                <br />
                - 운행예정일 (2일전까지) 취소시 예약금액 20% 환불
                <br />
                - 운행예정일 (당일) 취소시 예약금액 전액 환불불가/예약금이
                없을시 위약금 20%
                <br />
              </Typography>

              <Typography
                sx={{ fontSize: "1em", color: "green", fontWeight: "bold" }}
              >
                <br />
                📅 비수기 : 성수기 이외 달
              </Typography>

              <Typography
                sx={{ fontSize: "0.7em", color: "gray", lineHeight: "2.5em" }}
              >
                - 운행예정일 (3일전 이후) 취소시 예약금액의 100% 환불
                <br />
                - 운행예정일 (3일전~당일전까지) 취소시 예약금액의 50% 환불
                <br />
                - 운행예정일 (당일) 취소시 전액 환불불가/예약금이 없을 시 위약금
                10%
                <br />
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
