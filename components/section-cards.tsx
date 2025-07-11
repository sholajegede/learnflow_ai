import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUserContext } from "@/contexts/user-context"
import { Id } from "@/convex/_generated/dataModel"
import { IconUsersGroup, IconVersions, IconBookmarks } from "@tabler/icons-react"

export function SectionCards() {
  const { profile } = useUserContext();
  const allCompanions = useQuery(api.companions.getForUser, {
    userId: profile?._id as Id<"users">,
  });
  const allSessions = useQuery(api.sessions.getForUser, {
    userId: profile?._id as Id<"users">,
  });
  const allBookmarks = useQuery(api.bookmarks.getForUser, {
    userId: profile?._id as Id<"users">,
  });

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Companions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allCompanions?.length}
          </CardTitle>
          <CardAction>
            <IconUsersGroup />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Companions you have created
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Sessions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allSessions?.length}
          </CardTitle>
          <CardAction>
            <IconVersions />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Sessions you have completed
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bookmarks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allBookmarks?.length}
          </CardTitle>
          <CardAction>
            <IconBookmarks />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Companions you have bookmarked</div>
        </CardFooter>
      </Card>
    </div>
  )
}