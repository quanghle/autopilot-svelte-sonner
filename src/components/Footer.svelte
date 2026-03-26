<footer class="wrapper">
	<div class="container">
		<p class="p">
			<span>
				Forked from
				<a href="https://github.com/wobsoriano/svelte-sonner" target="_blank" rel="noopener noreferrer">svelte-sonner</a>
				by
				<a href="https://github.com/wobsoriano" target="_blank" rel="noopener noreferrer">wobsoriano</a>.
				Maintained by
				<a href="https://github.com/quanghle" target="_blank" rel="noopener noreferrer">quanghle</a>.
			</span>
		</p>
	</div>
</footer>

<style>
	.wrapper {
		padding: 32px 0;
		border-top: 1px solid var(--gray3);
		background: var(--gray1);
		margin-top: 164px;
	}

	.p {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: 0;
		font-size: 14px;
	}

	.p img {
		border-radius: 50%;
	}

	.p a {
		font-weight: 600;
		color: inherit;
		text-decoration: none;
	}

	.p a:hover {
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.wrapper {
			margin-top: 128px;
			padding: 16px 0;
		}
	}
</style>
