import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo) => {
      return (
        <div>
          <span>
            {repo.repo}
          </span> <span>
            {repo.name}
          </span> <span>
            {repo.forks}
          </span> <span>
            {repo.id}
          </span>
        </div>
      )
    })}
  </div>

  
)

export default RepoList;