import React from 'react';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Card, Container, Grid, Header, Icon, Image, List } from "semantic-ui-react";
import useData from "../hooks/useData";
import LoadingOverlay from "./LoadingOverlay";
import Album from "./Album";
import Posts from "./Posts";
import UserTodos from "./UserTodos";


function UserDetails() {
  const { userId } = useParams();
  const { path, url } = useRouteMatch();  // /users/:userId, /users/1

  const [user, isLoading] = useData(`/users/${userId}`, null);
  const [albums] = useData(`/users/${userId}/albums`, []);
  
  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      {user &&
      <Grid>
        <Grid.Column width={6}>
          <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{user.email}</span>
              </Card.Meta>
              <Card.Description>
                {user.address.city}, {user.address.street} {user.address.zipcode}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {user.company.name}
            </Card.Content>
            <Card.Content extra>
              <Icon name='camera'/>
              {albums.length} Albums
              <List>
                {albums.map(album => <List.Item>
                  <Link to={`${url}/albums/${album.id}`}>{album.title}</Link>
                </List.Item> )}
              </List>
              <Link to={`${url}/posts`}>
                <div>
                  <Icon name='sticky note outline'/>Posts
                </div>
              </Link>
              <Link to={`${url}/todos`}>
                <div>
                  <Icon name='numbered list'/>Todos
                </div>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={10}>
          <Switch>
            <Route exact path={path}>
              <Header as='h3'>Select an album</Header>
            </Route>
            <Route path={`${path}/albums/:albumId`}>
              <Album />
            </Route>
            <Route path={`${path}/posts`}>
              <Posts userId={userId}/>
            </Route>
            <Route path={`${path}/todos`}>
              <UserTodos />
            </Route>
            <Route path='*'>
              <Header as='h3'>Select an album</Header>
            </Route>
          </Switch>
        </Grid.Column>
      </Grid>
      }
    </Container>
  );
}

export default UserDetails;
