import { EditorType } from "./text-editor"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List } from "lucide-react"

export const Toolbar = ({editor}: {editor: EditorType}) => {
    return <div className="bg-secondary">
        <Button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} variant="outline">
            <Bold className="h-3 w-3"/>
        </Button>
        <Button type="button" onClick={() => editor?.chain().toggleItalic().run()} variant="outline">
            <Italic className="h-3 w-3"/>
        </Button>
        <Button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} variant="outline">
            <List className="h-3 w-3"/>
        </Button>
    </div>
}