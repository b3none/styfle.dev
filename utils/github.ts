import { Octokit } from '@octokit/rest';
const octokit = new Octokit();

export interface Repo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: any;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: License;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}
  
export interface Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface License {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}


export interface GitHubProject {
    name: string;
    description: string;
    homepage: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    size: number
    created_at: string;
    updated_at: string;
    pushed_at: string;
}

async function getReposForPage(page: number) {
    const res = await octokit.repos.listForUser({
        username: 'styfle',
        visibility: 'public',
        affiliation: 'owner',
        sort: 'created',
        per_page: 100,
        page
    });
    const repos: Repo[] = res.data;
    return repos;
}

export async function getProjects(): Promise<GitHubProject[]> {
    const page1 = await getReposForPage(1);
    const page2 = await getReposForPage(2);
    const page3 = await getReposForPage(3);
    const page4 = await getReposForPage(4);
    const page5 = await getReposForPage(5);
    
    const projects = [...page1, ...page2, ...page3, ...page4, ...page5].filter(r => !r.fork && !r.private && !r.disabled && !r.archived && !r.name.includes('example') && !r.name.includes('bug-') && !r.name.includes('-bug') && !r.name.includes('Bug'));
    return projects;
}