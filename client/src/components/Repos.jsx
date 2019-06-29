import React from 'react';
import Repo from './Repo.jsx';

const Repos = (props) => {
  return (
    <div>
      {console.log(props.repos)}
      {props.repos.map( (repo, key) => (
        <Repo repo={repo} key={key} />
      ))}
    </div>

  );
};

export default Repos;
