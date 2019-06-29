import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <div>There are {props.repos.length} repos.</div>
  </div>
)

export default RepoList;