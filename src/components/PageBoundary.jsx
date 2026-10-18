import { Component } from "react";

export default class PageBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="flex min-h-[75svh] flex-col items-center justify-center gap-5 px-6 py-28 text-center">
        <p className="section-label">A small interruption</p>
        <h1 className="font-syncopate text-xl font-bold text-white md:text-3xl">
          Let’s try that again.
        </h1>
        <p className="max-w-md text-sm text-white/55">
          This page couldn’t load. Check your connection, then reload to
          continue.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full border border-[#39ff14]/40 px-6 py-3 font-spacemono text-xs text-[#39ff14]"
        >
          Reload page
        </button>
      </section>
    );
  }
}
