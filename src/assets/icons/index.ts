
//手动去掉svg中的fill属性
const loadSvgs=()=>{
    const req = (require as any).context('./', false, /\.svg$/);
    const requireAll = (requireContext) => requireContext.keys().map(requireContext);
    requireAll(req);
}

loadSvgs();

export default {}
