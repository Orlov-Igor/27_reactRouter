import React from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Image, Feed } from "semantic-ui-react";
import useData from "../hooks/useData";
import LoadingOverlay from "./LoadingOverlay";



function PostDetails() {
	const { postId } = useParams();
	const [post, isLoading, error] = useData(`/posts/${postId}`, null);
	const [comments, isCommentsLoading] = useData(`/posts/${postId}/comments`, [])
	
	if (error && error.status === 404) {
		console.log(error);
		return <Redirect to={`/posts`}/>
    }

	return (
		<Container>
			<LoadingOverlay active={isLoading} />
			{post &&
			<Feed>
				<Feed.Event>
					<Feed.Label>
						<Link to={`/users/${post.userId}`}>
							<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt='user-avatar'/>
						</Link>
					</Feed.Label>
					<Feed.Content>
						<Feed.Summary>
							<Feed.User className='main-content'>
								{post.title}
							</Feed.User> 
						</Feed.Summary>
						<Feed.Extra className='main-content'text>
							{post.body}
						</Feed.Extra>
						<LoadingOverlay active={isCommentsLoading} />
								{comments.map(comment => (
									<Feed>
									<Feed.Event className='sub-content'>
									<Feed.Label>
										<Image src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' alt='user-avatar'/>
									</Feed.Label>
									<Feed.Content>
										<Feed.Summary>
											<Feed.User>
												{comment.name} <br />
												{comment.email}
											</Feed.User> 
										</Feed.Summary>
										<Feed.Extra text>
											{comment.body}
										</Feed.Extra>
									</Feed.Content>
								</Feed.Event>
								</Feed>
								)
								)}
					</Feed.Content>
				</Feed.Event>
			</Feed>
			}
		</Container>
	);
}

export default PostDetails;




			

		// 	<Card>
        //     <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
        //     <Card.Content>
        //       <Card.Header>{user.name}</Card.Header>
        //       <Card.Meta>
        //         <span className='date'>{user.email}</span>
        //       </Card.Meta>
              
        //     </Card.Content>
        //     <Card.Content extra>
        //       {user.company.name}
        //     </Card.Content>
        //     <Card.Content extra>
              
        //     </Card.Content>
        //   </Card>
        // </Grid.Column>
        // <Grid.Column width={10}>
        //   <Switch>
        //     <Route exact path={path}>
        //       <Header as='h3'>Select an album</Header>
        //     </Route>
        //     <Route path={`${path}/albums/:albumId`}>
              
        //     </Route>
        //     <Route path='*'>
        //       <Header as='h3'>Select an album</Header>
        //     </Route>
        //   </Switch>