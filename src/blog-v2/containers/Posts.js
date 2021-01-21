import React from 'react';
import {  Container, Grid, Feed } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import useData from '../hooks/useData';
import LoadingOverlay from "./LoadingOverlay";

function Posts({ userId }) {
	
	const [userPosts, isUserPostsLoading] = useData(`users/${userId}/posts`, []);
	const [posts, isLoading] = useData('/posts', []);
	
    if(userId) {
		return (
			<Container>
			<LoadingOverlay active={isUserPostsLoading} />
			<Grid columns={1}>
				{userPosts.map(post => (
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
	} else {
		return (
			<Container>
			<LoadingOverlay active={isLoading} />
			<Grid columns={2}>
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


	
}

export default Posts;

		