import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import heroImg_3 from "../../media/img_3.jpeg";
const Properties = () => {
  const StyledTypography = styled(Typography)({
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Limit to 3 lines
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    marginBottom: '20px',
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "40px",
    color: "#000336",
    fontWeight: "bold",
    textAlign: "center",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
  const Title_2 = styled(Typography)(({ theme }) => ({
    color: "#000336",
    textAlign: "center",
    margin: theme.spacing(4, 0, 4, 0),

  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  return (
    <Box sx={{ mt: 5, background: "linear-gradient(#387FF5, #fff)", py: 10 }}>
      <Container>
        <Title_2 >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center', // Align items vertically in the center
            border: '0.5px solid #4B5162',
            paddingRight: '20px',
            paddingLeft: '20px',
            borderRadius: '30px',
            backgroundColor: '#fff'
          }}>
            <img
              style={{
                maxWidth: '50px',
                maxHeight: '45px', // Adjust as needed
              }}
              src={heroImg_3}
              alt="Description"
            />
            <p >What we do for you </p>
          </div>
        </Title_2>
        <PropertiesTextBox>
          <Title variant="h1" sx={{ color: "#1C1F25" }}>
            Your Retirement Planning Services
          </Title>
          <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, textAlign: "center", }}>
            Leverage proactive retirement intelligence to optimize your financial strategy. From projecting retirement income to assessing investment performance, we provides insights to empower sound decisions, ensuring a secure and informed retirement journey.
          </Typography>
        </PropertiesTextBox>
        <Box sx={{ width: '100%', mt: 10 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Item>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "22px",
                    color: "#1C1F25",
                    fontWeight: "bold",
                  }}>
                  Investment Advice
                </Typography>
                <StyledTypography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, }}>
                  Navigate the financial landscape confidently with our tailored investment advice, ensuring your portfolio aligns with your goals. We prioritize your success, offering strategic insights for a secure and thriving financial future.   </StyledTypography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "22px",
                    color: "#1C1F25",
                    fontWeight: "bold",
                  }}>
                  Personalized Voice Assistance & ChatBot
                </Typography>
                <StyledTypography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, }}>
                  Embark on a personalized journey toward financial security with our voice and chat-assisted retirement planning. Tailored advice and intuitive conversations guide you through a unique path to achieve your retirement goals seamlessly.
                </StyledTypography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "22px",
                    color: "#1C1F25",
                    fontWeight: "bold",
                  }}>
                  Health Insurance
                </Typography>
                <StyledTypography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, }}>
                  Guard against unforeseen challenges with our comprehensive long-term care insurance solutions. Prioritize your well-being and financial stability, allowing you to age gracefully without compromising your financial security.
                </StyledTypography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "22px",
                    color: "#1C1F25",
                    fontWeight: "bold",
                  }}>
                  Finance Planning
                </Typography>
                <StyledTypography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, }}>
                  Shape a meaningful legacy with our personalized planning services. From charitable giving to wealth transfer, we assist you in creating a lasting impact, ensuring your values endure for generations to come.
                </StyledTypography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "22px",
                    color: "#1C1F25",
                    fontWeight: "bold",
                  }}>
                  Stay Updated, Always
                </Typography>
                <StyledTypography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, }}>
                  Stay at the forefront of financial trends with our commitment to keeping you informed. Regular updates and insights ensure you're well-equipped to make timely and informed decisions, fostering financial resilience in ever-evolving markets.
                </StyledTypography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "22px",
                    color: "#1C1F25",
                    fontWeight: "bold",
                  }}>
                  Your Data's Safe Haven
                </Typography>
                <StyledTypography sx={{ color: "#5A6473", fontSize: "16px", mt: 1, }}>
                  Feel assured and have peace of mind, knowing that your data is safeguarded by cutting-edge security protocols. Our commitment to data protection encompasses a comprehensive approach, including robust encryption methods and stringent access controls, ensuring the highest standards of safety for your valuable information.
                </StyledTypography>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Properties;
