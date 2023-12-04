import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const CustomCard = styled(Card)({
  width: '300px',
  margin: '10px',
  '@media (max-width: 600px)': {
    width: '100%',
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [infoCards, setInfoCards] = useState([]);
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  async function CardInfo() {
    try {
      const { data } = await axios.get("http://localhost:3000/post/listar");
      setInfoCards(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  useEffect(() => {
    CardInfo();
  }, []);

  return (
    <CardContainer>
      {infoCards.map((infoCard) => (
        <CustomCard key={infoCard.id}>
          <CardHeader title={infoCard.productName} />
          <a href={infoCard.productLink} target="_blank" rel="noopener noreferrer">
            <img src={infoCard.imageUrl} alt="link da Promoçâo" />
          </a>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {infoCard.productName}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded[infoCard.id]}
              onClick={() => handleExpandClick(infoCard.id)}
              aria-expanded={expanded[infoCard._v]}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[infoCard.id]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method: {infoCard.productDescription}</Typography>
            </CardContent>
          </Collapse>
        </CustomCard>
      ))}
    </CardContainer>
  );
}
