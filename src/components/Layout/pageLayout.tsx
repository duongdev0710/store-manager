import PageNav from "./Nav/pageComponent"
import PageContent from "./Content/pageComponent"
import PageFooter from "./Footer/pageComponent"
const LayoutPage = () => {
    return (
        <div className="h-screen">
            <PageNav />
            <PageContent />
            <PageFooter />
        </div>
    )
}

export default LayoutPage