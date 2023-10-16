import React from "react";

import { Avatar, Grid, Paper } from "@mui/material";

function UsersReviews({ allComments }) {

    return (
        <div style={{ padding : 14}} className="allComments">
            <h1>Comments</h1>
            {allComments.map(comment => (
                    <div className="usersReviews" key={comment._id}>
                    <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="user" src={'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{comment.userName}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {comment.comment}{" "}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    posted at...
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    </div>
            ))}
        </div>)
}

export default UsersReviews;