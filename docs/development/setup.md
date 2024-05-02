# Development setup

## Installation

Install dependencies according to [installation](/docs/installation.md) documentation.
If you use Windows, install [Ubuntu LTS](https://apps.microsoft.com/detail/9nz3klhxdjp5?hl=en-us&gl=US) from Microsoft store and set up [WSL](https://learn.microsoft.com/en-us/windows/wsl/setup/environment).

## VS Code

Open the workspace with _File_ > _Open Workspace from File..._ and select `tira-ai-platform.code-workspace`.

There are some extension recommendations configured in the workspace file, especially:

- GitLens, for Git
- GitHub Pull Requests, for issue number completion
- Project Manager, for multiple workspaces/repositories
- Live Preview, for previewing HTML
- Live Share, for pair coding

## Shell (optional)

### Prompt theme with Starship (cross-shell)

![Starship](https://raw.githubusercontent.com/starship/starship/master/media/demo.gif)

1. Install [Starship](https://starship.rs/guide/), `cargo` works in fuksi laptop

   ```sh
   cargo install starship --locked
   ```

1. Add this to the end of `~/.zshrc` to run starship at login

   ```sh
   eval "$(starship init zsh)"
   ```

1. See [Starship](https://starship.rs/) documentation for configuration and presets

### Zsh plugins with zimfw (Zsh only)

1. Set your default shell to Zsh

   ```sh
   chsh -s /bin/zsh
   ```

   For HPC: change `~/.profile` to

    ```sh
    unset FPATH # Workaround for LMod used in HPC
    zsh
    ```

1. Install  [zimfw](https://zimfw.sh/docs/install/)
1. Install plugins by adding `zmodule author/repository` to `~/.zimrc`, see [zimfw](https://zimfw.sh/docs/install/) documentation
1. Some recommendations, see [documentation](https://zimfw.sh/docs/modules/) or [awesome-zsh-plugins](https://github.com/unixorn/awesome-zsh-plugins) for more:
   - zsh-users/zsh-syntax-highlighting
    ![syntax-highlighting](https://zimfw.sh/images/zim_syntax-highlighting_cropped.gif)
   - zsh-users/zsh-autosuggestions
    ![autosuggestions](https://zimfw.sh/images/zim_autosuggestions_cropped.gif)
   - [zsh-users/zsh-completions](https://github.com/zsh-users/zsh-completions), extra command completions
   - completion, tab completion settings
