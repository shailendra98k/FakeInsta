import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { color } from '@mui/material/node_modules/@mui/system';
import AddCommentForm from './AddCommentForm'
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

export default function PostCard({ post }) {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("Post is: ", post)

  return (
    <Card style={{margin:'auto',marginBottom:10}} id={post.id} sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
              {post.user.username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" >
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.username}
        subheader={new Date(post.createdAt).toDateString()}

      />
      <CardMedia
        component="img"
        height="194"
        // image={require(`../upload/${post.photos}.jpg`)}
        // image={require('../upload/'+post.photos+'.jpg')}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon style={{ color: '' }} />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <AddCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <div>
        <AddCommentForm  postId={post.id} />
      </div>
        <ul style={{ margin: 0, padding: 0, paddingLeft:16 }}>
          {post.comments.map((comment) => {
            return <li key={comment.id} style={{margin:0,padding:0}}> {comment.user_username}:  {comment.description} </li>
          })}
        </ul>
        <br></br>
      </Collapse>
      
    </Card>
  );
}
