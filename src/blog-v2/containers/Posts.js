import React from 'react';
import {  Container, Grid, Feed } from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import useData from '../hooks/useData';
import LoadingOverlay from "./LoadingOverlay";

function Posts() {
	
	const { userId } = useParams();
	const postsPath = userId ? `/users/${userId}/posts` : '/posts' 
    const [posts, isLoading] = useData(postsPath, [])

	return (
		<Container>
		<LoadingOverlay active={isLoading} />
		<Grid columns={1}>
			{posts.map(post => (
			<Grid.Column>
				<Feed>
					<Feed.Event>
						<Feed.Label>
							<Link to={`/users/${post.userId}`}>
								<img src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt='user-avatar' />
							</Link>
						</Feed.Label>
						<Feed.Content>
							<Link to={`/posts/${post.id}`}>
								<Feed.Summary>
									<Feed.User>
										{post.title}
									</Feed.User> 
								</Feed.Summary>
								<Feed.Extra text>
									{post.body}
								</Feed.Extra>
							</Link>
						</Feed.Content>
					</Feed.Event>
				</Feed>
			</Grid.Column>
			))}
		</Grid>
		</Container>
	);
	
}

export default Posts;

		