import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Feed, Grid, Icon, Checkbox } from "semantic-ui-react";
import useData from "../hooks/useData";
import LoadingOverlay from "./LoadingOverlay"; 

function UserTodos() {
	const { userId }= useParams();
	const [todos, isLoading] = useData(`users/${userId}/todos`, []);
	
	return (
	  <Container>
		<LoadingOverlay active={isLoading} />
		<Grid columns={1}>
		{todos.map(todo => (
		<Grid.Column>
			<Feed>
				<Feed.Event>
				<Feed.Label>
				<Icon name='edit'/>
				</Feed.Label>
				<Feed.Content>
						<Feed.Summary>
							<Feed.User>
								<Checkbox label={todo.title} />
							</Feed.User> 
						</Feed.Summary>
						<Feed.Extra text>
						</Feed.Extra>
				</Feed.Content>
				</Feed.Event>
			</Feed>
		</Grid.Column>
		))}
		</Grid>
	  </Container>
	);
  }

export default UserTodos;
